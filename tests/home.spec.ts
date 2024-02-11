import { test, expect } from "@playwright/test";
import { Project } from "@/app/types";

test.describe("Home", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("starts new project", async ({ page, baseURL }) => {
    await page.getByTestId("start-new-project-button").click();

    const localStorage = await page.evaluate(() => {
      return JSON.parse(JSON.stringify(window.localStorage));
    });
    const projectsProperty: Project[] = JSON.parse(localStorage["projects"]);
    const project = projectsProperty[0];

    await expect(page).toHaveURL(`${baseURL}/projects/${project.id}`);
  });
});
