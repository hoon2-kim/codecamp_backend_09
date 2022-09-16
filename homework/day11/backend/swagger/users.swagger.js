/**
 * @swagger
 * /users:
 *    get:
 *      summary: 회원 목록 조회하기
 *      tags: [User]
 *      responses:
 *        200:
 *          description: 회원 목록 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    name:
 *                      type: string
 *                      example: 김김김
 *                    email:
 *                      type: string
 *                      example: gooaba1204@gmail.com
 *                    personal:
 *                      type: string
 *                      example: 123123-1231231
 *                    pwd:
 *                      type: string
 *                      example: "1234"
 *                    phone:
 *                      type: string
 *                      example: "01012341234"
 *                    og:
 *                      type: object
 *                      properties:
 *                        title:
 *                          type: string
 *                          example: 네이버
 *                        description:
 *                          type: string
 *                          example: 네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요
 *                        image:
 *                          type: string
 *                          example: https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png
 */

/**
 * @swagger
 * /user:
 *  post:
 *      summary: 회원가입
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                    example: 김김김
 *                  email:
 *                    type: string
 *                    example: gooaba1204@gmail.com
 *                  personal:
 *                    type: string
 *                    example: 123123-1231231
 *                  prefer:
 *                    type: string
 *                    example: https://naver.com
 *                  pwd:
 *                    type: string
 *                    example: 1234
 *                  phone:
 *                    type: string
 *                    example: "01012345678"
 *      responses:
 *          "200":
 *              description: 회원가입 성공
 *              content:
 *                application/json:
 *                    schema:
 *                        type: string
 *                        example: 632029e1dcb254ab910703f6
 *          "422":
 *              description: 회원가입 실패
 *              content:
 *                application/json:
 *                    schema:
 *                        type: string
 *                        example: 에러!! 핸드폰 번호가 인증되지 않았습니다.
 *          "409":
 *              description: 회원가입 실패
 *              content:
 *                application/json:
 *                    schema:
 *                        type: string
 *                        example: 에러!! 이미 핸드폰 번호가 존재합니다.
 */
