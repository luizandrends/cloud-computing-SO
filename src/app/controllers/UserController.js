class UserController {
  async store(request, response) {
    return response.json({
      ok: true,
    });
  }
}

export default new UserController();
