/**
 * @swagger
 * /tokens/phone:
 *    post:
 *      summary: 토큰 발급
 *      tags: [Token]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                phone:
 *                  type: string
 *                  required: true
 *                  example: "01012345678"
 *      responses:
 *        "200":
 *          description: 토큰 발급
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: 핸드폰으로 인증 문자가 전송되었습니다!
 */

/**
 * @swagger
 * /tokens/phone:
 *    patch:
 *      summary: 토큰 인증하기
 *      tags: [Token]
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                     phone:
 *                        type: string
 *                        required: true
 *                        example: "01012345678"
 *                     token:
 *                        type: string
 *                        required: true
 *                        example: 123456
 *      responses:
 *          "200":
 *            description: 인증 성공
 *            content:
 *              application/json:
 *                schema:
 *                  type: boolean
 *                  example: true
 *          "422":
 *            description: 토큰이 일치하지 않음
 *            content:
 *               application/json:
 *                 schema:
 *                   type: boolean
 *                   example: false
 */
