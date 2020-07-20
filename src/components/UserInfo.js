export class UserInfo {
  constructor(profileSelector) {
    this._profileName = document.querySelector(profileSelector.name);
    this._profileOccupation = document.querySelector(profileSelector.occupation);
    this._profileAvatar = document.querySelector(profileSelector.avatar);
  }
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      occupation: this._profileOccupation.textContent,
      avatar: this._profileAvatar
    }
  }
  setUserInfo(user) {
    this._profileName.textContent = user.name;
    this._profileOccupation.textContent = user.about;
    this._profileAvatar.src = user.avatar;
    this._userId = user._id;
  }
  getUserId() {
    return this._userId;
  }
}
