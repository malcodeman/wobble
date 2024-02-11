import { test, expect } from "@playwright/test";
import { Project } from "@/app/types";

test.describe("Templates", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/templates");
  });

  test("use template", async ({ page, baseURL }) => {
    await page.getByTestId("use-template-button").first().click();

    const localStorage = await page.evaluate(() => {
      return JSON.parse(JSON.stringify(window.localStorage));
    });
    const projectsProperty: Project[] = JSON.parse(localStorage["projects"]);
    const project = projectsProperty[0];

    await expect(page).toHaveURL(`${baseURL}/projects/${project.id}`);
  });
});
