## 插入数据时记得sync同步，特别是插入外键的值

## 报错Cannot add or update a child row: a foreign key constraint fails
原因：插入的外键值不对劲

## 返回的数据会带一堆无相关的，如果只想获取单纯的数据，传raw:true，update和destroy无效
入：User.create(obj, {raw:true} )

findOne({
    where: {

    },
    raw:true
})
## 使用获取器get的时候，必须res.toJSON()

## find,update或destory
find成功返回结果对象，失败返回null
create成功返回结果对象，失败则报错
update失败返回[0]，成功返回[1]
destory失败返回0，成功返回1
