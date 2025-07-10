import certificatesData from "@/services/mockData/certificates.json";

class CertificateService {
  constructor() {
    this.certificates = [...certificatesData];
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.certificates];
  }

  async getById(id) {
    await this.delay();
    const certificate = this.certificates.find(c => c.Id === id);
    if (!certificate) {
      throw new Error(`Certificate with Id ${id} not found`);
    }
    return { ...certificate };
  }

  async getByUserId(userId) {
    await this.delay();
    return this.certificates
      .filter(c => c.userId === userId)
      .map(c => ({ ...c }));
  }

  async getByCourseId(courseId) {
    await this.delay();
    return this.certificates
      .filter(c => c.courseId === courseId)
      .map(c => ({ ...c }));
  }

  async create(certificateData) {
    await this.delay();
    const newId = Math.max(...this.certificates.map(c => c.Id), 0) + 1;
    const newCertificate = {
      ...certificateData,
      Id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.certificates.push(newCertificate);
    return { ...newCertificate };
  }

  async update(id, updates) {
    await this.delay();
    const index = this.certificates.findIndex(c => c.Id === id);
    if (index === -1) {
      throw new Error(`Certificate with Id ${id} not found`);
    }
    this.certificates[index] = {
      ...this.certificates[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return { ...this.certificates[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.certificates.findIndex(c => c.Id === id);
    if (index === -1) {
      throw new Error(`Certificate with Id ${id} not found`);
    }
    this.certificates.splice(index, 1);
    return true;
  }
}

export const certificateService = new CertificateService();