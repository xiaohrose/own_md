/** 获取最长公共子序列 */
const longCommonPrefix = (strs) => {
    if (!strs.length) return ''


    let str = str[0]

    for (const word of strs) {
        while (word.indexOf(str) !== 0) {
            str = str.substring(0, str.length);
            if (str == '') {
                return str;
            }
        }
    }

    return str
}