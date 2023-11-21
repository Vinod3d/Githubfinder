$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
        let username = e.target.value;

        // Make request to Github
        $.ajax({
            url:'https://api.github.com/users/'+username,
            data:{
            client_id:'1236e45c610739c958bf',
            client_secret:'5ebdc9d2bd291fcfb215a09677378d4e4e692b61'
            }
        }).done(function(user){
            // console.log(user)
            $.ajax({
                url:'https://api.github.com/users/'+username+'/repos',
                data:{
                    client_id:'1236e45c610739c958bf',
                    client_secret:'5ebdc9d2bd291fcfb215a09677378d4e4e692b61',
                    sort: 'created: asc',
                    per_page: 5
                }
              }).done(function(repos){
                $.each(repos, function(index, repo){
                  $('#repos').append(`
                    <div class="card">
                      <div class="row p-2 align-items-center">
                        <div class="col-md-7">
                          <strong>${repo.name}</strong>: ${repo.description === null ? " " : repo.description}
                        </div>
                        <div class="col-md-3">
                          <span class="badge bg-dark p-2">Forks: ${repo.forks_count}</span>
                          <span class="badge bg-primary p-2">Watchers: ${repo.watchers_count}</span>
                          <span class="badge bg-success p-2">Stars: ${repo.stargazers_count}</span>
                        </div>
                        <div class="col-md-2">
                          <a href="${repo.html_url}" target="_blank" class="btn btn-dark">Repo Page</a>
                        </div>
                      </div>
                    </div>
                  `);
                });
              });
            $('#profile').html(`
                <div class="card border-primary mb-3" style="max-width: 100rem;">
                    <div class="card-header"><h3>${user.name}</h3></div>
                        <div class="card-body">
                        <div class="row">
                        <div class="col-md-3">
                            <img class="img-thumbnail avatar" src="${user.avatar_url}">
                            <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
                        </div>
                        <div class="col-md-9">
                            <span class="badge bg-dark p-2">Public Repos: ${user.public_repos}</span>
                            <span class="badge bg-primary p-2">Public Gists: ${user.public_gists}</span>
                            <span class="badge bg-success p-2">Followers: ${user.followers}</span>
                            <span class="badge bg-info p-2">Following: ${user.following}</span>
                        
                            <br><br>
                            <ul class="list-group">
                            <li class="list-group-item">Company: ${user.company}</li>
                            <li class="list-group-item">Website/blog: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
                            <li class="list-group-item">Location: ${user.location}</li>
                            <li class="list-group-item">Member Since: ${user.created_at}</li>
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <h3 class="page-header">Latest Repos</h3>
                <div id="repos"></div>
            `)
        })
    });
});