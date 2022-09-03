/**
 * @swagger
 * /users:
 *    get:
 *      summary: 회원 리스트 가져오기
 *      tags: [Users]
 *      responses:
 *        200:
 *          description: 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  properties:
 *                    email:
 *                      type: string
 *                      example: aaa@aaa.com
 *                    name:
 *                      type: string
 *                      example: 철수
 *                    phone:
 *                      type: string
 *                      example: 010-1234-5678
 *                    personal:
 *                      type: string
 *                      example: 220110-2222222
 *                    prefer:
 *                      type: string
 *                      example: https://naver.com
 *
 */
