describe('Endpoint Test', () => {
  describe('GET /', () => {
    it('200 OK', () => {
    });

    it('200 OK - Paging', () => {
    });

    it('200 OK - Order by', () => {
    });
  });

  describe('POST /', () => {
    it('200 OK', () => {
    });

    it('400 Bad Request - No title', () => {
    });

    it('400 Bad Request - No Playset', () => {
    });

    it("400 Bad Request - Page's category list length is not 6", () => {
    });

    it("400 Bad Request - Category's item list length is not 6", () => {
    });

    it('401 Unauthorized', () => {
    });
  });

  describe('GET /{id}', () => {
    it('200 OK', () => {
    });

    it('403 Forbidden', () => {
    });

    it('404 Not Found', () => {
    });
  });

  describe('PUT /{id}', () => {
    it('200 OK', () => {
    });

    it('400 Bad Request - No title', () => {
    });

    it('400 Bad Request - No Playset', () => {
    });

    it("400 Bad Request - Page's category list length is not 6", () => {
    });

    it("400 Bad Request - Category's item list length is not 6", () => {
    });

    it('401 Unauthorized', () => {
    });

    it('403 Forbidden', () => {
    });

    it('404 Not Found', () => {
    });
  });

  describe('DELETE /{id}', () => {
    it('200 OK', () => {
    });

    it('401 Unauthorized', () => {
    });

    it('403 Forbidden', () => {
    });

    it('404 Not Found', () => {
    });
  });
});
