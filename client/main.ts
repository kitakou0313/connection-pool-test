import axios, { AxiosInstance } from 'axios';
import http from 'http';

const httpAgentWithKeepAlive = new http.Agent({
  keepAlive: true, // 持続的な接続を有効化
  maxSockets: 10,  // 同時に開くソケットの最大数
  maxFreeSockets: 5, // 空いているソケットの最大数
  timeout: 60000,  // ソケットのタイムアウト（ミリ秒）
});

const httpAgentWithoutKeepAlive = new http.Agent({
  keepAlive: false, // 持続的な接続を有効化
  maxSockets: 10,  // 同時に開くソケットの最大数
  maxFreeSockets: 5, // 空いているソケットの最大数
  timeout: 60000,  // ソケットのタイムアウト（ミリ秒）
});

const URL = "http://localhost:3000"

async function measureReponseTime(endpoint:string, httpAgent:http.Agent): Promise<number> {  
  // Axiosインスタンスの作成
  const axiosInstance = axios.create({
    httpAgent,
    baseURL: URL, // 外部APIのベースURL
  });
  
  const start = performance.now()
  try {
    const response = await axiosInstance.get(endpoint);
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

  console.log(`Min: ${min}, Max: ${max}, 99%tile: ${tile99}`)
}

// メイン処理
const responseTimeWithKeepAliveArray: number[] = []
const responseTimeWithoutKeepAliveArray: number[] = []

for (let index = 0; index < 10000; index++) {
  responseTimeWithKeepAliveArray.push(
    await measureReponseTime("/test", httpAgentWithKeepAlive)
  )

  responseTimeWithoutKeepAliveArray.push(
    await measureReponseTime("/test", httpAgentWithoutKeepAlive)
  )
}

printPrerensentativeVals(responseTimeWithKeepAliveArray)
printPrerensentativeVals(responseTimeWithoutKeepAliveArray)
