import enrollmentsData from "@/services/mockData/enrollments.json";

class EnrollmentsService {
  constructor() {
    this.enrollments = [...enrollmentsData];
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.enrollments];
  }

  async getById(id) {
    await this.delay();
    const enrollment = this.enrollments.find(e => e.Id === id);
    if (!enrollment) {
      throw new Error(`Enrollment with Id ${id} not found`);
    }
    return { ...enrollment };
  }

  async getByUserId(userId) {
    await this.delay();
    return this.enrollments
      .filter(e => e.userId === userId)
      .map(e => ({ ...e }));
  }

  async getByCourseId(courseId) {
    await this.delay();
    return this.enrollments
      .filter(e => e.courseId === courseId)
      .map(e => ({ ...e }));
  }

  async create(enrollmentData) {
    await this.delay();
    const newId = Math.max(...this.enrollments.map(e => e.Id), 0) + 1;
    const newEnrollment = {
      ...enrollmentData,
      Id: newId,
      enrolledAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.enrollments.push(newEnrollment);
    return { ...newEnrollment };
  }

  async update(id, updates) {
    await this.delay();
    const index = this.enrollments.findIndex(e => e.Id === id);
    if (index === -1) {
      throw new Error(`Enrollment with Id ${id} not found`);
    }
    this.enrollments[index] = {
      ...this.enrollments[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return { ...this.enrollments[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.enrollments.findIndex(e => e.Id === id);
    if (index === -1) {
      throw new Error(`Enrollment with Id ${id} not found`);
    }
    this.enrollments.splice(index, 1);
    return true;
  }
}

export const enrollmentsService = new EnrollmentsService();