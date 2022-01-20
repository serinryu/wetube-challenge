//globalRouter
export const home = (req, res) => res.send("Home");
export const trending = (req, res) => res.send("Trending");
export const newStory = (req, res) => res.send("Newstory");

//storyRouter
export const seeStory = (req, res) => {
    const {
        params : { id }
    } = req;
    return res.send(`See a story of ${id}`);
};
export const editStory = (req, res) => {
    const {
        params : { id }
    } = req;
    return res.send(`Edit a story of ${id}`);
};
export const deleteStory  = (req, res) => {
    const {
        params : { id }
    } = req;
    return res.send(`Delete a story of ${id}`);
};
