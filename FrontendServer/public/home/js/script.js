// Fetch blog posts from the API
function fetchArticles() {
    $.ajax({
      url: 'http://localhost:8000/api/v1/articles',
      type: 'GET',
      success: function(data) {
        renderPosts(data); // Render all posts on the page
        // displayLatestPost(data); // Display the latest post
      },
      error: function(error) {
        console.error('Error fetching articles:', error);
      }
    });
}

// Delete post from API
function deletePost(postId) {
    $.ajax({
    url: `http://localhost:8000/api/v1/articles/${postId}`,
    type: 'DELETE',
    success: function() {
        alert('Post deleted successfully!');
        fetchArticles(); // Refresh the list of posts
    },
    error: function(error) {
        console.error('Error deleting post:', error);
    }
    });
}

// Render all blog posts
function renderPosts(posts) {
    
    if (posts == '{}' || posts == '[]') return
    if (posts.id) posts = [posts]
    // posts = posts.slice(1)
    const postsContainer = $('#blogPosts');
    postsContainer.empty(); // Clear any existing posts

    // Loop through the posts and render each one
    posts.forEach(post => {
        const postHTML = `
            <div class="blog-post wrap-anywhere bg-white p-4 rounded-lg shadow-md flex justify-between items-start relative" data-id="${post.id}" data-date="${post.date}" data-tag="${post.tag}">
            <div class="post-content">
                <h3 class="text-2xl font-bold text-black">${post.title}</h3>
                <p class="text-sm text-softblue">Date: ${post.date.split('T')[0]} ${post.date.split('T')[1].split('.')[0]} | Tag: ${post.tag}</p>
                <p class="mt-2">${post.text}</p>
            </div>
            
            <!-- Post Menu Button -->
            <button class="menu-btn p-2 text-black rounded-full absolute top-2 right-2">☰</button>

            <!-- Popup Menu (Hidden by default) -->
            <div class="post-menu-popup hidden absolute top-8 right-2 bg-white shadow-lg rounded p-4 w-40 space-y-2">
                <button class="edit-btn text-sm text-softblue hover:text-green-700 w-full text-left">Edit</button>
                <button class="delete-btn text-sm text-softblue hover:text-green-700 w-full text-left">Delete</button>
                <button class="copy-id-btn text-sm text-softblue hover:text-green-700 w-full text-left" data-id="${post.id}">Copy ID</button>
            </div>
            </div>
        `;
        postsContainer.append(postHTML); // Append each post to the container
        }
    );
        
    // Menu Button to toggle the popup
    $('.menu-btn').on('click', function() {
        const menu = $(this).next('.post-menu-popup');
        $('.post-menu-popup').not(menu).addClass('hidden'); // Hide other menus
        menu.toggleClass('hidden'); // Toggle visibility of the clicked menu
    });

    // Open Edit Modal
    $('.edit-btn').click( function () {
        console.log('clicked')
        const post = $(this).closest('.blog-post');
        const id = post.data('id');
        const title = post.find('h3').text().trim();
        const text = post.find('p').last().text().trim();
        const tagLine = post.find('p').eq(0).text(); // "Date: xxxx | Tag: someTag"
        const tag = tagLine.split('| Tag: ')[1].trim();
    
        // Fill modal fields
        $('#editPostId').val(id);
        $('#editPostTitle').val(title);
        $('#editPostText').val(text);
        $('#editPostTag').val(tag);
    
        $('#editPostModal').removeClass('hidden').addClass('flex')
        });
    
    // Delete Button
    $('.delete-btn').click(function() {
        if (confirm('Are you sure you want to delete this post?')) {
            let id = $(this).parent().parent().attr('data-id')
            deletePost(id)
        }
    });
    
    // Copy ID Button
    $('.copy-id-btn').click(function() {
        const postId = $(this).data('id');
        navigator.clipboard.writeText(postId).then(() => {
            alert(`Post ID ${postId} copied to clipboard!`);
        });
    });

    // Hide the popup when clicking outside
    $(document).on('click', function () {
        // $('.post-menu-popup').hide();
    });
}
  

$(document).ready(function() {
    
    
    // Initial fetch of articles when the page loads
    fetchArticles();
    
    
    attachEventListeners();
})

// Display the latest post
function displayLatestPost(posts) {
    // Sort posts by date (most recent first)
    // posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Get the latest post
    const latestPost = posts[0];

    // Insert the latest post's content into the `#latestPostContent` container
    const latestPostHTML = `
    <h3 class="text-2xl font-bold">${latestPost.title}</h3>
    <p class="text-sm text-softblue">Date: ${latestPost.date.split('T')[0]} ${latestPost.date.split('T')[1].split('.')[0]} | Tag: ${latestPost.tag}</p>
    <p>${latestPost.text}</p>
    `;
    $('#latestPostContent').html(latestPostHTML);
}

// Attach event listeners for Edit, Delete, and Copy ID buttons
function attachEventListeners() {


    // Handle the search form submit
    $('#searchForm').on('submit', function(e) {
        e.preventDefault();

        let url = ''

        let searchId = $('#searchId').val().toLowerCase();
        let searchDate = $('#searchDate').val();
        let searchTag = $('#searchTag').val().toLowerCase();
        
        if (searchId){
            url = `http://localhost:8000/api/v1/articles/${searchId}`
        } else {
            if (searchDate || searchTag){
                url = `http://localhost:8000/api/v1/articles?date=${searchDate}&tag=${searchTag}`
            }
        }

        $.ajax({
            url: url,
            type: 'GET',
            success: function(data) {
                renderPosts(data); // Render all posts on the page
            },
            error: function(error) {
                console.error('Error fetching articles:', error);
            }
        });
    })

    // Cancel button
    $('#cancelEditBtn').on('click', function () {
        $('#editPostModal').addClass('hidden').removeClass('flex');
    });

    // Submit updated post
    $('#editPostForm').on('submit', function (e) {
        e.preventDefault();

        const id = $('#editPostId').val();
        const updatedPost = {
        title: $('#editPostTitle').val(),
        text: $('#editPostText').val(),
        tag: $('#editPostTag').val()
        };

        $.ajax({
            url: `http://localhost:8000/api/v1/articles/${id}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedPost),
            success: function () {
                alert('Post updated successfully!');
                $('#editPostModal').addClass('hidden').removeClass('flex');
                fetchArticles(); // Refresh posts
        },
        error: function (err) {
            alert('Failed to update post.');
            console.error(err);
        }
        });
    });

    // Show the create post modal
    $('#createPostBtn').on('click', function () {
        $('#createPostModal').removeClass('hidden').addClass('flex');
    });
  
    // Hide the modal when cancel is clicked
    $('#cancelCreateBtn').on('click', function () {
        $('#createPostModal').addClass('hidden').removeClass('flex');
    });
  
    // Submit new post (example logic)
    $('#createPostForm').on('submit', function (e) {
        e.preventDefault();
    
        const title = $('#newPostTitle').val();
        const text = $('#newPostText').val();
        const tag = $('#newPostTag').val();
  
        // Example POST request to API
        $.ajax({
            type: "POST",
            url: `http://localhost:8000/api/v1/articles`,
            data: JSON.stringify({
                title: title,
                text: text,
                tag : tag
            }),
            contentType: "application/json",
            success: function (response) {
                alert('Post created successfully!');
                $('#createPostModal').addClass('hidden').removeClass('flex');
                $('#createPostForm')[0].reset();
                // Optionally: fetch articles again
                fetchArticles();
            } 
        });
    })

    
}

    



        

    









