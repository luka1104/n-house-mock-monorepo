//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NhouseMembership is
    ERC721,
    ERC721URIStorage,
    ERC721Enumerable,
    Ownable
{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("NhouseMembership", "NMT") {}

    function mintNFT(
        address recipient,
        string memory tokenURI
    ) public onlyOwner returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function batchMintNFT(
        address recipient,
        string[] memory tokenURIs
    ) public onlyOwner returns (uint256[] memory) {
        uint256[] memory newItemIds = new uint256[](tokenURIs.length);

        for (uint256 i = 0; i < tokenURIs.length; i++) {
            _tokenIds.increment();

            newItemIds[i] = _tokenIds.current();
            _mint(recipient, newItemIds[i]);
            _setTokenURI(newItemIds[i], tokenURIs[i]);
        }

        return newItemIds;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    struct TokenInfo {
        uint256 tokenId;
        string tokenUri;
    }

    function getTokenUriFromAddress(
        address address_
    ) public view virtual returns (TokenInfo[] memory) {
        uint256 _balance = balanceOf(address_);
        TokenInfo[] memory _tokens = new TokenInfo[](_balance);
        for (uint256 i = 0; i < _balance; i++) {
            uint256 _tokenId = tokenOfOwnerByIndex(address_, i);
            _tokens[i] = TokenInfo(_tokenId, tokenURI(_tokenId));
        }
        return _tokens;
    }

    function getAllTokens() public view returns (TokenInfo[] memory) {
        uint256 totalTokens = totalSupply();
        TokenInfo[] memory tokens = new TokenInfo[](totalTokens);
        for (uint256 i = 0; i < totalTokens; i++) {
            uint256 tokenId = tokenByIndex(i);
            tokens[i] = TokenInfo(tokenId, tokenURI(tokenId));
        }
        return tokens;
    }
}
