// swagger-jsdoc 옵션
export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "나만의 미니프로젝트 API 명세서",
      version: "1.0.0",
    },
  },
  apis: ["./swagger/*.swagger.js"], // docs 따로 만들면 주소를 여기다 넣음 // *.swagger.js의 의미는 swagger.js로 끝나는 모든 파일들
};
