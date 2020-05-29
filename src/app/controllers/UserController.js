import User from '../models/User';

class UserController {
  async store(request, response) {
    const { name, email, password } = request.body;

    const user = await User.create({
      name,
      email,
      password,
    });

    return response.json(user);
  }
}

export default new UserController();
