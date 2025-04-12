let editingPostId = null;

function openCreatePopup() {
  editingPostId = null;
  $('#popup-title').text('Create Post');
  $('#post-title').val('');
  $('#post-text').val('');
  $('#post-tag').val('');
  $('#overlay').show();
  $('#post-popup').show();
}

function openEditPopup(post) {
  editingPostId = post.id;
  $('#popup-title').text('Edit Post');
  $('#post-title').val(post.title);
  $('#post-text').val(post.text);
  $('#post-tag').val(post.tag);
  $('#overlay').show();
  $('#post-popup').show();
}

function closePopup() {
  $('#overlay').hide();
  $('#post-popup').hide();
}

function submitPost() {
  const post = {
    id: editingPostId || Date.now(),
    title: $('#post-title').val(),
    text: $('#post-text').val(),
    tag: $('#post-tag').val(),
    date: new Date().toISOString().split('T')[0]
  };
  renderPosts([post]);
  closePopup();
}

function searchPosts() {
  const id = $('#search-id').val();
  const date = $('#search-date').val();
  const tag = $('#search-tag').val();

  // Simulate a fetch response
  const dummyData = [
    {
      id: '1',
      title: 'First Post',
      text: 'This is the first blog post. It might be a bit long so we may add a Read More...',
      tag: 'intro',
      date: '2024-04-01'
    },
    {
      id: '2',
      title: 'Second Post',
      text: 'Short post here.',
      tag: 'update',
      date: '2024-04-02'
    }
  ];

  let results = dummyData.filter(post => {
    return (!id || post.id.includes(id)) &&
           (!date || post.date === date) &&
           (!tag || post.tag.includes(tag));
  });

  renderPosts(results);
}

function renderPosts(posts) {
  const contentBox = $('#content-box');
  contentBox.empty();

  posts.forEach(post => {
    const div = $('<div class="post"></div>');

    let text = post.text.length > 100 ? post.text.slice(0, 100) + '... <a href="#">Read More</a>' : post.text;

    div.html(`
      <h3>${post.title}</h3>
      <p>${text}</p>
      <button onclick='openEditPopup(${JSON.stringify(post)})'>Edit</button>
      <div class="tag">Tag: ${post.tag} | Date: ${post.date}</div>
    `);

    contentBox.append(div);
  });
}
