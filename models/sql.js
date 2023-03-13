// create UserTable(manager)
exports.createUserTable = ()=>{
    return `create table if not exists user(
        userId text primary key,
        password text,
        salt text
    )`;
};

// String type은 ' ' 로 감싼다.
exports.insertUser = (userId, password, salt)=>{
    return `insert into user(userId, password, salt) 
        values( '${userId}', '${password}', '${salt}' )`;
};

exports.selectUserById = (userId)=>{
    return `select * from user where userId='${userId}'`;
};

exports.deleteUser = (userId)=>{
    return `delete from user where userId='${userId}'`;
};

// create ItemTable
exports.createItemTable = ()=>{
    return `create table if not exists item(
        itemName text,
        image text,
        price bigint(1)
    )`;
};

exports.insertItem = (itemName, image, price)=>{
    return `insert into item(itemName, image, price) 
    values( '${itemName}', '${image}', ${price} )`;
};

exports.selectAllItem = () => {
    return `select * from item`;
};

exports.selectItem = (itemName)=>{
    return `select * from item where itemName='${itemName}'`;
};

exports.updateItem =(itemName, changeName,  changeImage, changePrice)=>{
    return `update item set itemName='${changeName}', image='${changeImage}', price=${changePrice} where itemName='${itemName}' ` ;
}

exports.deleteItem = (itemName)=>{
    return `delete from item where itemName='${itemName}'`;
};

exports.deleteAllItem = () => {
    return `delete from item`
}


