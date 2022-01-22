//globalRouter
export const home = (req, res) =>
  res.render("stories/home", { pageTitle: "Home" });
export const trending = (req, res) =>
  res.render("stories/trending", { pageTitle: "Trending" });
export const newStory = (req, res) =>
  res.render("stories/newstory", { pageTitle: "NewStory" });


//storyRouter
export const seeStory = (req, res) => {
    const {
      params: { id }
    } = req;
    res.render("stories/seestory", { pageTitle: `SeeStory`, id });
};
export const editStory = (req, res) => {
    const {
      params: { id }
    } = req;
    res.render("stories/editstory", { pageTitle: `EditStory`, id });
};
export const deleteStory = (req, res) => {
    const {
      params: { id }
    } = req;
    res.render("stories/deletestory", { pageTitle: `DeleteStory`, id });
};
  
