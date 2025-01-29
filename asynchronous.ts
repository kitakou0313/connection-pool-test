// Promiseは非同期処理の最終的な結果を表すobject

let promise = new Promise((resolve, reject) => {
    // 何らかの非同期処理

    // 成功時
    resolve("This task is completed")

    // 失敗時
    reject("Task is failed")
})

promise.then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})

// async keyword
// Promiseを返す関数を表す

// await keyword
// Promiseがreject, resolveされるまで処理を停止する．
// async functionの中でのみ使用可能
// ESではTop level awaitというのもある

async function fetchData() {
    try {
        let response = await fetch("localhost:300/test");
        let data = await response.json()

        return data
    } catch (error) {
        console.error("Error:", error)
    }
}

const res = await fetchData()

// パターン
// Promiseを返す + asyncあり
async function pattern1(){
    let promise = new Promise<number>((resolve, reject) => {
        // 何らかの非同期処理

        // 成功時
        resolve(1)

        // 失敗時
        reject("Task is failed")
    })
    
    return promise
}

const resOfPattern1 = pattern1()

// Promiseを返す + asyncなし 
function pattern2(){
    let promise = new Promise<number>((resolve, reject) => {
        // 何らかの非同期処理

        // 成功時
        resolve(1)

        // 失敗時
        reject("Task is failed")
    })
    
    return promise
}
const resOfPattern2 = pattern2()

// Promiseを返さない + asyncあり
// Promiseを返す関数扱いになる
async function pattern3(){
    return 1
}

const resOfPattern3 = pattern3()

// Promiseを返さない + asyncなし
// これは通常の関数
function pattern4(){
    return 1
}
