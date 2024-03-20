export class UserDTO {
    constructor(user) {
      this._id = user._id || user.id || null;
      this.first_name = user.first_name || "";
      this.last_name = user.last_name || "";
      this.email = user.email || "";
      this.age = user.age || null;
      this.role = user.role;
    }
  }