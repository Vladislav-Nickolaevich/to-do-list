describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {

        await page.goto('http://localhost:6006/iframe.html?args=&id=todolist-additemform--add-item-form-story&viewMode=story');

        await page.waitForTimeout(1000)

        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    })
})