using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserApiWeb.Date;
using UserApiWeb.Logic;

namespace UserApiWeb.presentation
{
    [Route("api/[controller]")]
    [ApiController]
    public class userGendersController : ControllerBase
    {
        private readonly DateContext _context;

        public userGendersController(DateContext context)
        {
            _context = context;
        }

        // GET: api/userGenders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<userGender>>> GetuserGender()
        {
          if (_context.userGender == null)
          {
              return NotFound();
          }
            return await _context.userGender.ToListAsync();
        }

        // GET: api/userGenders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<userGender>> GetuserGender(int id)
        {
          if (_context.userGender == null)
          {
              return NotFound();
          }
            var userGender = await _context.userGender.FindAsync(id);

            if (userGender == null)
            {
                return NotFound();
            }

            return userGender;
        }

        // PUT: api/userGenders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutuserGender(int id, userGender userGender)
        {
            if (id != userGender.Id)
            {
                return BadRequest();
            }

            _context.Entry(userGender).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!userGenderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/userGenders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<userGender>> PostuserGender(userGender userGender)
        {
          if (_context.userGender == null)
          {
              return Problem("Entity set 'DateContext.userGender'  is null.");
          }
            _context.userGender.Add(userGender);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetuserGender", new { id = userGender.Id }, userGender);
        }

        // DELETE: api/userGenders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteuserGender(int id)
        {
            if (_context.userGender == null)
            {
                return NotFound();
            }
            var userGender = await _context.userGender.FindAsync(id);
            if (userGender == null)
            {
                return NotFound();
            }

            _context.userGender.Remove(userGender);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool userGenderExists(int id)
        {
            return (_context.userGender?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
