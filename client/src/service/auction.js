export default class AuctionService {
  constructor(http, tokenStorage, socket) {
    this.http = http;
    this.tokenStorage = tokenStorage;
    this.socket = socket;
  }

  async getAuctions(username) {
    const query = username ? `?username=${username}` : "";
    return this.http.fetch(`/auctions${query}`, {
      method: "GET",
      headers: this.getHeaders(),
    });
  }

  async postAuction(auction) {
    return this.http.fetch(`/auctions`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        title: auction.title,
        description: auction.description,
        startPrice: auction.startPrice,
        duration: auction.duration,
        username: "Hari",
        name: "Hari",
      }),
    });
  }

  async deleteAuction(auctionId) {
    return this.http.fetch(`/auction/${auctionId}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
  }

  async updateAuction(auctionId, title, description, startPrice, duration) {
    return this.http.fetch(`/auction/${auctionId}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify({ title, description, startPrice, duration }),
    });
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  onSync(callback) {
    return this.socket.onSync("auctions", callback);
  }
}
