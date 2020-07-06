export class UserInfo {
  constructor(profileSelector) {
    this._profileName = document.querySelector(profileSelector.name);
    this._profileOccupation = document.querySelector(profileSelector.occupation);
  }
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      occupation: this._profileOccupation.textContent
    }
  }
  setUserInfo(user) {
    this._profileName.textContent = user.name;
    this._profileOccupation.textContent = user.occupation;
  }
}
