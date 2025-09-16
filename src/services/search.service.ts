import Blog from "../models/blog.model";

type searchQuery = {
  query?: string;
  sortBy?: string;
  author?: string;
  page?: string;
  limit?: string;
};

export class SearchService {
  static async searchBlog(data: searchQuery) {
    let { author, limit, page, query, sortBy } = data;
    if (page === "") {
      page = "1";
    }
    if (limit === "") {
      limit = "10";
    }
    const searchCriteria: any = {};
    if (query) {
      searchCriteria.$or = [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { body: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ];
    }

    if (author) {
      searchCriteria.author = author;
    }

    const skip = (Number(page) - 1) * Number(limit);

    let sortCriteria: any = { createdAt: -1 };
    if (sortBy === "oldest") sortCriteria = { createdAt: 1 };
    if (sortBy === "popular") sortCriteria = { read_count: -1 };
    if (sortBy === "likes") sortCriteria = { likes: -1 };

    const blogs = await Blog.find(searchCriteria)
      .populate("author", "username email")
      .sort(sortCriteria)
      .skip(skip)
      .limit(Number(limit));
    const total = await Blog.countDocuments(searchCriteria);

    return { blogs, total };
  }
}
