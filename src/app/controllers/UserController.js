import { hash } from 'bcryptjs';

import User from '../models/User';

class UserController {
  async store(request, response) {
    const { name, email, password } = request.body;

    const findEmail = await User.findOne({
      where: { email },
    });

    if (findEmail) {
      return response.status(400).json({ err: 'Email already exist' });
    }

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
