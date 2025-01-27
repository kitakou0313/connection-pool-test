import axios, { AxiosInstance } from 'axios';
import { promises } from 'dns';
import http from 'http';

const httpAgentWithKeepAlive = new http.Agent({
  keepAlive: true, // 持続的な接続を有効化
  maxSockets: 3,  // 同時に開くソケットの最大数
  maxFreeSockets: 3, // 空いているソケットの最大数
  timeout: 60000,  // ソケットのタイムアウト（ミリ秒）
});

const httpAgentWithoutKeepAlive = new http.Agent({
  keepAlive: false, // 持続的な接続を有効化
  maxSockets: 3,  // 同時に開くソケットの最大数
  maxFreeSockets: 3, // 空いているソケットの最大数
  timeout: 60000,  // ソケットのタイムアウト（ミリ秒）
});

const URL = "http://localhost:3000"

async function measureReponseTime(endpoint:string, axiosInstance:AxiosInstance): Promise<number> {  
  
  const start = performance.now()
  try {
    const responses = await axiosInstance.get(endpoint);
  } catch (error) {
    console.error('Error ', (error as Error).message);
    throw error;
  }
  const end = performance.now()

  return end - start
}

// TODO
function printPrerensentativeVals(responseTimeArray:number[]) {
  const min = Math.min(...responseTimeArray)
  const max = Math.max(...responseTimeArray)

  const tile99 = responseTimeArray.sort()[Math.floor(responseTimeArray.length * 0.99) - 1]
  const tile999 = responseTimeArray.sort()[Math.floor(responseTimeArray.length * 0.999) - 1]

  console.log(`Min: ${min}, 99%tile: ${tile99}, 99.9%tile: ${tile999}, Max: ${max}`)
}

// メイン処理
const responseTimeWithKeepAliveArray: number[] = []
const responseTimeWithoutKeepAliveArray: number[] = []

const axiosInstanceWithKeepalive = axios.create({
  httpAgent: httpAgentWithKeepAlive,
  baseURL: URL, // 外部APIのベースURL
});

const axiosInstanceWithoutKeepalive = axios.create({
  httpAgent: httpAgentWithoutKeepAlive,
  baseURL: URL, // 外部APIのベースURL
});

for (let index = 0; index < 10000; index++) {
  responseTimeWithKeepAliveArray.push(
    await measureReponseTime("/test", axiosInstanceWithKeepalive)
  )
}

for (let index = 0; index < 10000; index++) {
  responseTimeWithoutKeepAliveArray.push(
    await measureReponseTime("/test", axiosInstanceWithoutKeepalive)
  )
}

console.log("With Keep-alive")
printPrerensentativeVals(responseTimeWithKeepAliveArray)
console.log("Without Keep-alive")
printPrerensentativeVals(responseTimeWithoutKeepAliveArray)
