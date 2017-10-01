// Add event listenrer for for submit
document.getElementById('add').addEventListener("click", saveBookmark);
document.getElementById('clear').addEventListener("click", clearForm);

function clearForm() {
	document.getElementById("bookmarkForm").reset();
}

function saveBookmark(e) {
	// Get form values
	var siteName = document.getElementById("siteName").value;
	var siteUrl = document.getElementById("siteUrl").value;

	if (!validateForm(siteName, siteUrl)) {
		return false;
	}

	var bookmark = {
		name: siteName,
		url: siteUrl
	}

	if (localStorage.getItem("bookmarks") === null) {
		var bookmarks = [];

		bookmarks.push(bookmark);

		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
	} else {
		var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

		bookmarks.push(bookmark);

		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
	}

	clearForm();

	getBookmarks();
	
	e.preventDefault();
}

function deleteBookmark(url) {
	var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

	for (var i = 0; i < bookmarks.length; i++) {
		if (bookmarks[i].url === url) {
			bookmarks.splice(i, 1);
		}
	}
	localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

	getBookmarks();	
}

function getBookmarks() {
	var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
	
	var bookmarksList = document.getElementById("bookmarksList");

	bookmarksList.innerHTML = "";

	for (var i = 0; i < bookmarks.length; i++) {
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksList.innerHTML += "<div>" + name + "</div>" + "<a href=\"" + url + "\" target=\"_blank\">" + "Visit" + "</a>" 
								+ "<br>" + "<a onclick=\"deleteBookmark('" + url + "')\" href=\"#\">Delete</a>";
	}
}

function validateForm(siteName, siteUrl) {
	if (!siteName || !siteUrl) {
		alert("Please enter some values");
		return false;
	}

	var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/;

	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)){
		alert("Please enter a valid url (Hint: Should begin with 'http://')");
		return false;
	}
	return true;
}