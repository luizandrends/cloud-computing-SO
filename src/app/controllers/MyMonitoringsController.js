class MyMonitoringsController {
  async list(request, response) {
    return response.json({ ok: true });
  }
}

export default new MyMonitoringsController();
