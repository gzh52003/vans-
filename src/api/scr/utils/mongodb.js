// 引入mongo模块
const {MongoClient,ObjectId} = require('mongodb');

// Connection URL 连接地址 mongdb默认端口 27017
const url = 'mongodb://localhost:27017';

// Database Name 数据库名字
const dbName = 'gz2003h5';

/**Promise封装连接数据库*/
async function connect(){
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    return {client,db}
}

/**查*/
async function find(colName,query={},options={}){
    // 调用连接封装函数
    const {client,db} = await connect();
    // 使用集合 db.collection(colName) 使用colName这个集合
    const collection = db.collection(colName)
    // 查询数据集合
    if(query._id && typeof query._id === "string"){
        query._id = ObjectId(query._id)
    }
                    // find 如果目标是空就是查询所有
    let result = collection.find(query)
    if(options.skip){
        // skip跳过指定数量
        result = result.skip(options.skip)
    }
    if(options.limit){
        // limit 限制数量
        result = result.limit(options.limit)
    }
    // 排序
    if(options.sort){
        let key,val;
        key = options.sort[0]
        if(options.sort.length>1){
            // 如果options有两个值代表了设置排序 
            val = options.sort[1] * 1
        }else{
            // 默认-1 反序
            val = -1
        }
        // sort排序 1 正序 -1反序
        result = result.sort({
            //sort({key:1}) // 
            [key]:val
        })
    }           
                    // 必须转成数组
    result = await result.toArray();
    client.close();
    return result
}

/**操作数据库之增加数据封装*/
async function insert(colName,data){
    // 调用connect封装函数 解构 db client
    const {db,client} = await connect();
    // 根据传入的合集名称获取数据库对应的合集
    const collection = db.collection(colName);
  
    const result = await collection[Array.isArray(data) ? 'insertMany':'insertOne'](data)
    client.close();
    return result;
}

/**改*/
async function update(colName,query,newData){
    const {db,client} = await connect();
    const collection = db.collection(colName);
    if(query._id && typeof query._id === 'string'){
        query._id = ObjectId(query._id);
    }
    // .updateMany( { age: { $gt : 18 } } , { $set : { description : "成年"} } )
    const result = await collection.updateMany(query,newData);
    client.close();
    return result;
   
}
/**删*/
async function remove(colName,query){//query{_id:'5c128cdbd1233ce12c878a32'}
    const {db,client} = await connect();

    if(query._id && typeof query._id === 'string'){
        query._id = ObjectId(query._id) // mongodb ID的格式： ObjectId("5f2d4b36be699a08b001bfc5")
    }

    const collection = db.collection(colName);

    const result = await collection.deleteMany(query);
    client.close();
    return result;
}
module.exports = {
    find,
    insert,
    update,
    remove
}