import { hash } from 'bcryptjs';

import User from '../models/User';

class UserController {
  async store(request, response) {
    const { name, email, password } = request.body;

    const passwordHashed = await hash(password, 8);

    const user = await User.create({
      name,
      email,
      password: passwordHashed,
    });

    return response.json(user);
  }
}

export default new UserController();
