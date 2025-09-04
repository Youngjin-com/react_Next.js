import { expect, test } from "@playwright/test";

test.describe("라우팅 테스트", () => {
  test("충전소 검색 페이지 이동", async ({ page }) => {
    // 홈 페이지로 이동
    await page.goto("http://localhost:3000/"); //
    // 충전소 검색 버튼 찾기
    const searchButton = await page.getByText("충전소 검색");
    // 충전소 검색 버튼 클릭
    await searchButton.click();
    // 새로운 URL이 '/station'인지 확인
    await expect(page).toHaveURL("http://localhost:3000/station");
  });

  test("즐겨찾기 페이지 이동", async ({ page }) => {
    // 홈 페이지로 이동
    await page.goto("http://localhost:3000/");
    // 텍스트가 즐겨찾기인 버튼 찾기
    const favoriteButton = await page.getByText("즐겨찾기");
    // 즐겨찾기 버튼 클릭
    await favoriteButton.click();
    // 새로운 URL이 '/favorite'인지 확인
    await expect(page).toHaveURL("http://localhost:3000/favorite");
  });
});
