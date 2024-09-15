import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/server.mjs"; // Update the path to your server file

const { expect } = chai;
chai.use(chaiHttp);

describe("User Feedback for Books", () => {
  it("should add feedback with a rating for a specific book", (done) => {
    const feedback = {
      userId: "64f12a45c1a68d5f7b123456", // Replace with actual user ID
      bookId: "64f12a45c1a68d5f7b123457", // Replace with actual book ID
      feedback: "Amazing book! Highly recommend.",
      rating: 5,
    };

    chai
      .request(server)
      .post("/api/userFeedback/add-feedback")
      .send(feedback)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body)
          .to.have.property("message")
          .eql("Feedback added successfully");
        expect(res.body.feedback).to.have.property("userId");
        expect(res.body.feedback).to.have.property("bookId");
        expect(res.body.feedback).to.have.property("feedback");
        expect(res.body.feedback).to.have.property("rating");
        done();
      });
  });
});
