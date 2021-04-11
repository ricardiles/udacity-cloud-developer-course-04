import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

const XAWS = AWSXRay.captureAWS(AWS)

const s3 = new AWS.S3({
  signatureVersion: 'v4'
})

const bucketName = process.env.IMAGES_S3_BUCKET
const urlExpiration = process.env.SIGNED_URL_EXPIRATION

import { TodoItem } from '../../models/TodoItem'

export class TodoAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly todosTable = process.env.TODOS_TABLE) {
  }

  async getTodos(userId: string): Promise<TodoItem[]> {
    console.log('Getting todos from user')
    var params = {
        TableName : this.todosTable,
        KeyConditionExpression: "#idUser = :user",
        ExpressionAttributeNames:{
            "#idUser": "userId"
        },
        ExpressionAttributeValues: {
            ":user": userId
        }
    };
    let result: TodoItem[] | PromiseLike<TodoItem[]>
    await this.docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", err);
        } else {
            console.log("Query succeeded.");
            result = <TodoItem[]>data.Items
        }
    }).promise()


    return result
  }

  async createTodo(todo: TodoItem): Promise<TodoItem> {
    todo = {
      ...todo,
      attachmentUrl: `https://${bucketName}.s3.amazonaws.com/${todo.id}`
    }
    await this.docClient.put({
      TableName: this.todosTable,
      Item: todo
    }).promise()

    return todo
  }

  async updateTodo(todo: TodoItem): Promise<TodoItem> {
    await this.docClient.update({
      TableName: this.todosTable,
      Key: {
        "todoId": todo.id
      },
      UpdateExpression: "set name = :n, dueDate=:due, done=:d",
      ExpressionAttributeValues:{
          ":n":todo.name,
          ":due":todo.dueDate,
          ":d":todo.done
      },
      ReturnValues:"UPDATED"
    }).promise()

    return todo
  }

  async deleteTodo(todoId: string, userId:string): Promise<string> {
    await this.docClient.delete({
      TableName: this.todosTable,
      Key: {
        "todoId": todoId,
        "userId": userId
      }
    }).promise()

    return todoId
  }

  async generateUploadUrl(todoId: string, userId:string): Promise<string> {
    let validated: boolean = false
    await this.docClient.get({
      TableName: this.todosTable,
      Key:{
        "userId": userId,
        "todoId": todoId
      }
    },function(err, data) {
      if (err) {
        validated = false
      } else {
        if(data){
          validated = true
        }
      }
    }).promise()

    if (validated){
      return await s3.getSignedUrl('putObject', {
        Bucket: bucketName,
        Key: todoId,
        Expires: urlExpiration
      })
    }
    return ''
  }
}

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDB instance')
    return new XAWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }

  return new XAWS.DynamoDB.DocumentClient()
}
