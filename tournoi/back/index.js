	const challonge = require('challonge');

	const client = challonge.createClient({
	  apiKey: 'zlESCFxOuAoG6Xq3rYAjAreH81mnHDMs7XIhgJeb'
	});

	client.tournaments.index({
	  callback: (err, data) => {
		  console.log(err, data);
	  }
	});