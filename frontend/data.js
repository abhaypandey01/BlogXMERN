export const comments = [
    {
        _id: 'blog_001',
        blog: "blog_001",
        name: "Alice Sharma",
        content: "Really insightful post! Loved the examples you used.",
        createdAt: "2025-06-22T10:15:30Z",
        isApproved: false
    },
    {
        _id: 'blog_001',
        blog: "blog_002",
        name: "Ravi Mehta",
        content: "I think more details on async/await would help beginners.",
        createdAt: "2025-06-22T11:04:10Z",
        isApproved: false
    },
    {
        _id: 'blog_001',
        blog: "blog_001",
        name: "Sneha Kapoor",
        content: "This clarified a lot of my doubts. Thanks!",
        createdAt: "2025-06-22T12:30:45Z",
        isApproved: true
    },
    {
        _id: 'blog_001',
        blog: "blog_003",
        name: "Mohit Verma",
        content: "Interesting perspective! I hadn’t thought about it that way.",
        createdAt: "2025-06-21T16:50:00Z",
        isApproved: false
    },
    {
        _id: 'blog_001',
        blog: "blog_002",
        name: "Priya Singh",
        content: "Could you cover this topic in a video next time?",
        createdAt: "2025-06-21T18:22:15Z",
        isApproved: true
    }
];

export const blogs = [
    {
        id: "blog_001",
        title: "Understanding JavaScript Closures",
        subtitle: "A deep dive into closures and scope in JS",
        description: "Closures are functions that have access to variables from another function’s scope. This happens due to lexical scoping in JavaScript. They’re essential for data privacy, currying, and more...",
        image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg",
        isPublished: true,
        category: "Technology",
        createdAt: "2025-06-20T09:00:00Z"
    },
    {
        id: "blog_002",
        title: "React Hooks: The Complete Guide",
        subtitle: "Everything you need to know about hooks",
        description: "<p>  <strong>JavaScript closures</strong> are one of the most powerful and often misunderstood features in the language. A closure is created when a function retains access to its <em>lexical scope</em> even after the outer function has finished executing.</p><p>  Closures enable <code>data privacy</code>, function factories, and powerful patterns like currying. For example, they allow you to create a function with persistent private variables.</p><pre><code>function outer() {  let counter = 0;  return function inner() {    counter++;console.log(counter);  }}const count = outer();count(); // 1count(); // 2</code></pre><p>In the example above, the <code>inner</code> function forms a closure over the variable <code>counter</code>, preserving its value between calls.</p><p>Understanding closures helps in mastering advanced JavaScript concepts like <strong>callbacks</strong><strong>event handling</strong>, and <strong>async programming</strong>.</p>",
        image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg",
        isPublished: true,
        category: "Technology",
        createdAt: "2025-06-21T11:30:00Z"
    },
    {
        id: "blog_003",
        title: "Node.js vs Deno: What You Need to Know",
        subtitle: "A head-to-head comparison of two server runtimes",
        description: "Deno, built by the creator of Node.js, is a secure and modern alternative that supports TypeScript out of the box. Let’s compare their performance, ecosystem, and features...",
        image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg",
        isPublished: false,
        category: "Finance",
        createdAt: "2025-06-19T15:45:00Z"
    }
];

export const categories = [
    "All", "Finance", "Lifestyle", "Technology", "Startups"
]

export const footerData = [
    {
        title: "Company",
        links: ["About Us", "Careers", "Blog", "Press"]
    },
    {
        title: "Support",
        links: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"]
    },
    {
        title: "Community",
        links: ["Developers", "Partners", "Forums", "Events"]
    }
];

export const dashboard_data = {
    blogs: 12,
    comments: 48,
    drafts: 4,
    recentBlogs: [
        {
            _id: "blog_012",
            title: "Mastering Promises in JavaScript",
            createdAt: "2025-06-21T14:30:00Z",
            isPublished: true
        },
        {
            _id: "blog_011",
            title: "Understanding Event Loop and Call Stack",
            createdAt: "2025-06-20T10:00:00Z",
            isPublished: true
        },
        {
            _id: "blog_010",
            title: "Guide to JavaScript Array Methods",
            createdAt: "2025-06-18T08:45:00Z",
            isPublished: false
        }
    ]
};
