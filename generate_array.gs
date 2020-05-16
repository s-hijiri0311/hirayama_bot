/**
 * シート全体の値を取得した二次元配列から、指定の列のデータを抜き出し一次元配列を構成する
 *
 * @param {Object[][]} シートのデータを二次元配列化した配列
 * @param {number} 配列の列数（0以上のインデックス）
 * @return {Object[]} 指定の列（見出しを除く）のデータによる一次元配列
 */
function generateArray(values, column){
  return values.map(record => record[column]).filter(value => value);
}
