import axios, { AxiosInstance } from 'axios';
import http from 'http';
import https from 'https';

// HTTPコネクションプールの設定
const httpAgent = new http.Agent({
  keepAlive: true, // 持続的な接続を有効化
  maxSockets: 10,  // 同時に開くソケットの最大数
  maxFreeSockets: 5, // 空いているソケットの最大数
  timeout: 60000,  // ソケットのタイムアウト（ミリ秒）
});

const httpsAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 10,
  maxFreeSockets: 5,
  timeout: 60000,
});

const URL = "http://localhost:3000"

// Axiosインスタンスの作成
const axiosInstance = axios.create({
  httpAgent,
  httpsAgent,
  baseURL: URL, // 外部APIのベースURL
});

// 外部APIからデータを取得する関数
async function fetchData(endpoint:string) {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error ', (error as Error).message);
    throw error;
  }
};

async function measureReponseTime(endpoint:string): Promise<number> {
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

  const tile99 = responseTimeArray.sort()[Math.floor(responseTimeArray.length * 0.99)]

  console.log(`Min: ${min}, Max: ${max}, 99%tile: ${tile99}`)
}

// メイン処理
const responseTimeArray: number[] = []

for (let index = 0; index < 10000; index++) {
  responseTimeArray.push(
    await measureReponseTime("/test")
  )
}

printPrerensentativeVals(responseTimeArray)
