interface Message{
    text: string;
    createdAt: admin.firestore.Timestampt;
    user:{
        _id: string;
        name:string |null;
        avatar: string;
    };
}