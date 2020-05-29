class MonitoringController {
  async store(request, response) {
    response.json({ ok: true });
  }
}

export default new MonitoringController();
