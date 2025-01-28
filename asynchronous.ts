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
