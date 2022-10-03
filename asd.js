const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

function solution(s,n) {
    let answer = '';

    for(let i=0; i<s.length; i++) {
        if(s[i]=== ' ') {
            answer+=s[i] // ' '
        } else {
            // charCodeAt : 주어진 문자의 유코 데터(숫자)를 반ㅏ
            // String.fromCahrCode : 유니코드 데이터(숫자)를 문자로 반환
            let idx = s[i].charCodeAt() + n
            if(idx > 122 || (idx>90 && (idx - n)<97)) {
                idx -= 26
            }
            answer += String.fromCharCode(idx)
        }
    }
    return answer
}


