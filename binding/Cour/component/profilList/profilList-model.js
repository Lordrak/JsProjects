angular.module("facebook").service("profilListModel", function(){
	return{
		getProfiles: function(){
			var listOfProfil = [
				{
					firstname: 'Rudy',
					lastname: 'Raffin',
					age: '26',
					gender: 'm'
				},
				{
					firstname: 'Ali',
					lastname: 'Sheikh',
					age: '29',
					gender: 'm'
				},
				{
					firstname: 'Sarah',
					lastname: 'Kennouche',
					age: '22',
					gender: 'f'
				}
			];
			return listOfProfil;
		}
	};
});