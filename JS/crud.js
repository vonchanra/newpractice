
        $(document).ready(function () {
            toastr.success('Lorem ipsum dolor sit amet, consetetur sadipscing elitr.')

            fetchArticle()
            let article = {
                TITLE: "",
                DESCRIPTION: ""
            }
            $('#callModal').click(function () {
                $('#articleModal').modal('show')
                $('#titleModal').text('Add Article');
            })
            $('#save').click(function () {
                console.log($('#title').val())
                article.TITLE = $('#title').val()
                article.DESCRIPTION = $('#desc').val()
                let id = $('#idArticle').val()
                console.log(`id edit ${id}`)
                if ($('#titleModal').text() == "Add Article") {
                    addArticle(article)
                } else {
                   updateArticle(id, article)
                }
                $('#articleModal').modal('hide');
            })
        })
        function addArticle(article) {
            //title & description
            $.ajax({
                url: "http://api-ams.me/v1/api/articles",
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                data: JSON.stringify(article),
                success: function (res) {
                    fetchArticle()
                },
                error: function (er) {
                    console.log(er)
                }
            })
        }
        //request data by jquery function
        function fetchArticle() {
            $.ajax({
                url: "http://api-ams.me/v1/api/articles?page=1&limit=5",
                method: "GET",
                success: function (response) {
                    showDataToTable(response.DATA)
                },
                error: function (er) {
                    console.log(er)
                }
            })
        }
        function showDataToTable(article) {
            var content = ""
            for (a of article) {
                content +=
                    `
                    <tr>
                        <td class="ID">${a.ID}</td>
                        <td class="t">${a.TITLE}</td>
                        <td class="d">${a.DESCRIPTION}</td>
                        <td><img class="img-thumbnail" src=${a.IMAGE} /></td>
                        <td>
                            <button class="btn btn-outline-primary wave-effect" onclick="deleteArticle(this)">DELETE</button>
                            <button class="btn btn-outline-primary wave-effect" onclick="showModal(this)">EDIT</button>
                        </td>
                    </tr>
                `
            }
            $('tbody').html(content)
        }        
        function deleteArticle(btn) {
            let id  = $(btn).parents('tr').find('.ID').text()
            $.ajax({
                url: "http://api-ams.me/v1/api/articles/" + id,
                method: "DELETE",
                success: function (res) {
                    fetchArticle()
                },
                error: function (er) {
                    console.log(er);
                }
            })
        }
       
        function showModal(editButton) {
            console.log(editButton)
            let t = $(editButton).parents('tr').find('.t').text()
            let d = $(editButton).parents('tr').find('.d').text()
            console.log(t, d)
            $('#title').val(t);
            $('#desc').val(d)
            $('#idArticle').val($(editButton).parents('tr').find('.ID').text())
            $('#articleModal').modal('show')
            $('#titleModal').text('Edit Article');
        }
        function updateArticle(id, article) {
            $.ajax({
                url: "http://api-ams.me/v1/api/articles/" + id,
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                data: JSON.stringify(article),
                success: function () {
                    fetchArticle()
                },
                error: function (er) {
                    console.log(er)
                }
            })
        }
