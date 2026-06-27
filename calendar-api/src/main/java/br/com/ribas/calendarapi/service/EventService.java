package br.com.ribas.calendarapi.service;

import br.com.ribas.calendarapi.entity.Event;
import br.com.ribas.calendarapi.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository repository;

    public List<Event> findAll() {
        return repository.findAll();
    }

    public Event findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento não encontrado"));
    }

    public Event save(Event event) {
        return repository.save(event);
    }

    public Event update(Long id, Event updated) {
        Event existing = findById(id);
        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setStartDateTime(updated.getStartDateTime());
        existing.setEndDateTime(updated.getEndDateTime());
        existing.setColor(updated.getColor());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }


}
