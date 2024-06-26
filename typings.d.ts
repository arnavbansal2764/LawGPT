interface MyMessage{
    text:ReadableStream<any>;
    createdAt: admin.firestore.Timestamp;
    user:{
        _id: string;
        name:string |null;
        avatar: string;
    };
}