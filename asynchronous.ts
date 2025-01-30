// Promiseは非同期処理の最終的な結果を表すobject

import { resolve } from "path"

let promise = new Promise((resolve, reject) => {
    // 何らかの非同期処理

    // 成功時はresolveを実行する
    // 引数に与えた値がPromise.thenで実行するコールバック関数で引数として受け取れる
    resolve("This task is completed")

    // 失敗時
    // 引数に与えた値がPromise.catchで実行するコールバック関数で引数として受け取れる
    reject("Task is failed")
})

promise.then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})

const promiseNumber = new Promise<number>((resolve, reject) => {
    // 何らかの非同期処理の結果としてnumber型の値を得る
    const resOfAsyncOperation = 1000
    
    resolve(resOfAsyncOperation)
})

promiseNumber.then((res) => {
    console.log(res)
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

// 考察

// awaitはPromiseを完全に除外するためのものではない？
// awaitを使うとasync expressionをfunctionにつける必要がある
// async expressionを使うと返り値が自動でPromiseになるため，最終的にはどこかでPromiseを取り扱う必要がでてくる（Top level awaitを除く）

// 複数処理を並列に行う場合はPromiseを直接扱う必要がある？
// awaitは指定したPromiseの完了を待つため

// async expressionをつけると返り値が自動でPromiseに含まれる形になる？
