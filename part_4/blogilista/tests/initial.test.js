const listHelper = require('../utils/list_helper')

describe('dummy test', () => {
    test('dummy returns one', () => {
        const blogs = []
      
        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })
})

describe('total likes', () => {
    test('when list has empty list of blogs, likes are 0', () => {
        const result = listHelper.totalLikes(listHelper.emptyBlogList)
        expect(result).toBe(0)
    })

    test('when list has only one blog, then likes amount is 5', () => {
      const result = listHelper.totalLikes(listHelper.listWithOneBlog)
      expect(result).toBe(5)
    })

    test('when list has many blogs, then likes amount is 36', () => {
        const result = listHelper.totalLikes(listHelper.manyBlogs)
        expect(result).toBe(36)
    })
  })

describe('favourite blog', () => {
    test('Returns nothing from empty list', () => {
        const result = listHelper.favoriteBlog(listHelper.emptyBlogList)
        expect(result).toEqual('')
    })

    test('Returns blog with most likes from list of one', () => {
        const result = listHelper.favoriteBlog(listHelper.listWithOneBlog)
        expect(result).toEqual(listHelper.listWithOneBlog[0])
    })

    test('Returns blog with most likes from many blogs', () => {
        const result = listHelper.favoriteBlog(listHelper.manyBlogs)
        expect(result).toEqual(listHelper.manyBlogs[2])
    })
})

describe('mostBlogs', () => {
    test('mostBlogs returns author with most blogs', () => {
        const result = listHelper.mostBlogs(listHelper.manyBlogs)
        expect(result).toStrictEqual({ 'author': 'Robert C. Martin', 'blogs': 3})
    })
})

describe('mostLikes', () => {
    test('mostLikes returns author with most likes', () => {
        const result = listHelper.mostLikes(listHelper.manyBlogs)
        expect(result).toStrictEqual({ author: "Edsger W. Dijkstra",
        likes: 17 })
    })
})