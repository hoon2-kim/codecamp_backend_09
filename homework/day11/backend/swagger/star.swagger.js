/**
 * @swagger
 * /starbucks:
 *    get:
 *      summary: 스타벅스 커피메뉴 보여주기
 *      tags: [Starbucks]
 *      responses:
 *        200:
 *          description: 메뉴 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    _id:
 *                      type: string
 *                      example: 631ef35696dc403e591222ef
 *                    name:
 *                      type: string
 *                      example: 블랙 글레이즈드 라떼
 *                    img:
 *                      type: string
 *                      example: https://image.istarbucks.co.kr/upload/store/skuimg/2022/08/[9200000002259]_20220819134201192.jpg
 */
